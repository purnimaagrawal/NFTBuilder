import { BadRequestException } from '@nestjs/common';
import { isInt, isNumberString } from 'class-validator';
import { errorModel } from 'src/dtos/errorModel';

export function removeEmptyFields(object: Object) {
  for (const [key, value] of Object.entries(object)) {
    if (!value) {
      delete object[key];
    }
  }
}

export function getValidId(id: string, error: errorModel) {
  if (!isNumberString(id)) {
    throw new BadRequestException(error);
  }
  const validId = Number(id);
  if (!isInt(validId) || validId <= 0) {
    throw new BadRequestException(error);
  }
  return validId;
}
