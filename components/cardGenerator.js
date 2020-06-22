const SUIT = {
  SUN: 'sun',
  MOON: 'moon',
  STAR: 'star',
  CHIEF: 'chief',
  GOURD: 'gourd',
  PIPE: 'pipe',
  SICKLE: 'sickle',
};

const createCard = ({
  value,
  suit,
  description,
}) => {
  let slotCount;
  if (value === 0) {
    slotCount = 1;
    decorationCount = 1;
  } else if (value > 10) {
    slotCount = 1;
    decorationCount = 14 - value;
  } else {
    slotCount = value;
    decorationCount = 0;
  }
  return {
    value,
    suit,
    description,
    baseSymbol: () => null,
    slotCount,
    decorationCount,
  }
};