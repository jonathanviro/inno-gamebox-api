import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export function handleDatabaseErrors(error: any): never {
  console.log('El error aqui', error);

  // Error de clave duplicada (unique constraint violation)
  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  if (error.detail) {
    throw new InternalServerErrorException(`Database error: ${error.detail}`);
  }

  throw new InternalServerErrorException('An unknown database error occurred');
}
