import { FrontMatter, getAllQuestionsMeta, getQuestionBySlug } from 'utils/getQuestions';
import { GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize'

import Question from 'components/Question';
import { BASE_URL } from 'config/links';

export default Question;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, content, pagesMeta, nextLink, prevLink } = getQuestionBySlug(
    params.id as string,
    'javascript',
  );

  const scope: { [key: string]: any } = data;

  const mdxSource = await serialize(content, {scope})


  const url = `${BASE_URL}questions/javascript/${data.slug}`;

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

export async function getStaticPaths() {
  const questions = getAllQuestionsMeta('javascript');

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
}
