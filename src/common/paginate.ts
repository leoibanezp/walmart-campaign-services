import { ConfigService } from "src/config/config.service";
import { SearchProductsFilterDto } from "src/products/dto/search-product-filter.dto";

export interface IPaginateResult<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  perPage: number;
  page?: number | null;
  totalPages?: number;
}

export const getFormatSearchWithPaging = (filterDto: SearchProductsFilterDto, configService: ConfigService) => {
  if (!filterDto.page) {
    filterDto.page = Number(configService.get('PRODUCT_PAGE_DEFAULT'));
  }
  if (!filterDto.size) {
    filterDto.size = Number(configService.get('PRODUCT_PERPAGE_DEFAULT'));
  }
  if (filterDto.search) {
    filterDto.search = filterDto.search.trim().toLowerCase();
  }
  return filterDto;
}
