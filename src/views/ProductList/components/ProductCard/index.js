// @flow
import { IMediaItem } from '../../../../utils/interfaces';
export { default } from './ProductCard';

export interface IProductCardProps {
  className?: string;
  mediaItem: IMediaItem;
}
