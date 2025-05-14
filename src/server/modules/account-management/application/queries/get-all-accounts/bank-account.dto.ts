import { BankAccount, BankName } from '../../../domain/bank-account/bank-account';

export interface BankAccountDto {
  id: string;
  userId: string;
  name: BankName;
  iban: string;
  bic: string;
}

export class BankAccountDtoMapper {
  public static toDto(entity: BankAccount): BankAccountDto {
    return {
      id: entity.id,
      userId: entity.userId,
      name: entity.name,
      iban: entity.iban,
      bic: entity.bic,
    };
  }
}
