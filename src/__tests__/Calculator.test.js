import { calculateRisk} from '../App';

test('1. calculates the correct result for given inputs', () => {
 //pick a value from each of the input fields
  expect(calculateRisk("Less than 3 months", "Unknown", 0, 0, "Less than 180 minutes")).toBe(139);  
});

test('2. calculates the correct result for given inputs', () => {
   expect(calculateRisk("More than 24 months", "", "", "", "Unknown")).toBe(58);   
 });

test('3. calculates the correct result for given inputs', () => {
  expect(calculateRisk("More than 24 months", "", "", "", "")).toBe(0);   
});

test('4. calculates the correct result for given inputs', () => {
  expect(calculateRisk("Less than 3 months", 4, 19, 33, "Less than 180 minutes")).toBe(224);   
});

test('5. calculates the correct result for given inputs', () => {
  expect(calculateRisk("Less than 3 months", 4, 19, 33, "More than 180 minutes")).toBe(248);   
});

test('6. calculates the correct result for given inputs', () => {
  expect(calculateRisk("More than 24 months", "5", 14, 71, "Less than 180 minutes")).toBe(217);   
}
);

test('7. calculates the correct result for given inputs', () => {
  expect(calculateRisk("3-24 months", "5", 30, 50, "Less than 180 minutes")).toBe(235);   
}
);

test('8. calculates the correct result for given inputs', () => {
  expect(calculateRisk("Less than 3 months", 5, 0, 0, "Unknown")).toBe(206);   
} 
);

test('9. calculates the correct result for given inputs', () => {
  expect(calculateRisk("Less than 3 months", 5, 0, 0, '')).toBe(148);   
}
);

test('10. calculates the correct result for given inputs', () => {
  expect(calculateRisk("Less than 3 months", "1", 0, 0, '')).toBe(52);   
}
);

test('11. calculates the correct result for given inputs', () => {
  expect(calculateRisk("3-24 months", "5", 27, 59, "Less than 180 minutes")).toBe(238);   
}
);



