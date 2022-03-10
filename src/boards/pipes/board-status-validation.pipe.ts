import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

export class boardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}는 존재하지 않는 상태 값 입니다.`);
    }

    return value;
  }

  private isStatusValid(value: any) {
    value = value.toUpperCase();
    
    const index = this.StatusOptions.indexOf(value);
    return index !== -1;
  }

}