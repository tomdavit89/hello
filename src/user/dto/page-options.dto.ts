import {IsOptional, IsInt, Min, Max} from "class-validator";
import {Type} from 'class-transformer';

export class PageOptionsDto{
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    readonly page?: 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    readonly limit? = 10;

}
