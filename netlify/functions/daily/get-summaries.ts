import type { Post } from '@lib/supabase';
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import { parallel, sift } from 'radash';

const openaiConfig = new Configuration({ apiKey: process.env.OPENAI_API_KEY! });
const openai = new OpenAIApi(openaiConfig);

export const getSummaries = async (posts: Array<Post>) => {
  const summaries = await parallel(15, posts, async (post) => {
    const $ = load(await fetch(post.link).then((res) => res.text()));
    const content = $('main p').children().remove().end().text().slice(0, 3800);
    const prompt = `Summarize in 1 paragraph: ${content}`;
    const { data: payload } = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = payload.choices?.[0]?.message?.content;
    return summary != null ? { id: post.id, summary } : null;
  });

  return sift(summaries);
};
