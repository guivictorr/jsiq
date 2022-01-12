import { GetStaticProps } from 'next';
import Question from 'components/Question';
import { getStaticPathsCommon, getStaticPropsCommon } from 'utils/getStaticData';

export default Question;
export const getStaticProps: GetStaticProps = async ({ params }) =>
  await getStaticPropsCommon({ params, type: 'angular' });
export const getStaticPaths = async () => await getStaticPathsCommon('angular');
