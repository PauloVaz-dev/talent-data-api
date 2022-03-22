import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Get(':organizationName')
  async login(
    @Res() res,
    @Query() query: any,
    @Param() param: any,
    @Request() request: any,
  ): Promise<any> {
    const { tags } = query;
    const { organizationName } = param;
    const { roles } = request.user;

    const products = await this.productService.findProducts({
      organizationName,
      tags,
      roles,
    });

    res.status(200).json(products).send();
  }
}
