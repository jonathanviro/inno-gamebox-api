import { UpdateProductDto } from './update-product.dto';

export class UpdateProductWithIdDto {
    id: string;
    updates: UpdateProductDto;
}