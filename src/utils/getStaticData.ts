import { serialize } from 'next-mdx-remote/serialize';
import { ParsedUrlQuery } from 'querystring';
import { BASE_URL } from 'config/links';
import { FrontMatter, getAllQuestionsMeta, getQuestionBySlug, QuestionType } from './getQuestions';

interface GetStaticPropsCommon {
  params: ParsedUrlQuery;
  type: QuestionType;
}

export const getStaticPropsCommon = async ({ params, type }: GetStaticPropsCommon) => {
  const { data, content, pagesMeta, nextLink, prevLink } = getQuestionBySlug(
    params.id as string,
    type,
  );

  const scope: { [key: string]: any } = data;

  const mdxSource = await serialize(content, { scope });

  const url = `${BASE_URL}questions/${type}/${data.slug}`;

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      pagesMeta,
      nextLink,
      prevLink,
      url,
    },
  };
};

export const getStaticPathsCommon = async (type: QuestionType) => {
  const questions = getAllQuestionsMeta(type);

  return {
    paths: questions.map((item: FrontMatter) => {
      return {
        params: {
          id: `${item.slug}`,
        },
      };
    }),
    fallback: false,
  };
};
