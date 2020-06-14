// @flow
export { default } from './Pagination';
// export {  } from './Pagination';

export interface IPagination  {
  page: number,
  pageCount: number,
  itemCount: number,
  itemsPerPage: number
};

export interface IPaginationProps extends IPagination {
    className?: string
}