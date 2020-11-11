import { ConfigService } from "src/config/config.service";
import { SearchProductFilterDto } from "src/dto/search-product-filter.dto";

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

export const getFormatSearchWithPaging = (filterDto: SearchProductFilterDto, configService: ConfigService) => {
  if (!filterDto.page) {
    filterDto.page = Number(configService.get('PRODUCT_PAGE_DEFAULT'));
  } else {
    filterDto.page = Number(filterDto.page);
  }
  if (!filterDto.size) {
    filterDto.size = Number(configService.get('PRODUCT_PERPAGE_DEFAULT'));
  } else {
    filterDto.size = Number(filterDto.size);
  }
  if (filterDto.search) {
    filterDto.search = filterDto.search.trim().toLowerCase();
  } else {
    filterDto.search = '';
  }
  return filterDto;
}
