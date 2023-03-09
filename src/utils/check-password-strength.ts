export enum StrengthTypes {
  NONE = 0,
  VERY_WEAK = 1,
  WEAK = 2,
  GOOD = 3,
  STRONG = 4,
}

export function checkPasswordStrength (value: string): StrengthTypes {
  let strength: StrengthTypes = StrengthTypes.NONE;
  if (value !== ``) {
    if (value.length <= 6) {
      strength = 1;
    }

    if (value.length > 6 && (value.match(/[a-z]/) || value.match(/\d+/) || value.match(/[.,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,\]]/))) {
      strength = 2;
    }

    if (value.length > 6 && ((value.match(/[a-z]/) && value.match(/\d+/)) || (value.match(/\d+/) && value.match(/[.,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,\]]/)) || (value.match(/[a-z]/) && value.match(/[.,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,\]]/)))) {
      strength = 3;
    }

    if (value.length > 6 && value.match(/[a-z]/) && value.match(/\d+/) && value.match(/[.,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,\]]/)) {
      strength = 4;
    }
  }
  return strength;
}
