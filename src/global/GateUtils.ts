export const createRPN = (gateStr: string): string[] => {
  const tokens: RegExpMatchArray | null = gateStr.match(/(\(|!|\d|&&|\)|\|\|)/g);
  const result: string[] = [];
  const stack: string[] = [];

  if(tokens === null) return [];

  for(let i = 0; i < tokens.length; i++) {
    const token: string = tokens[i];
    if(token === undefined) return [];

    if(/\d/.test(token)) {
      result.push(token);
    } else if(/\)/.test(token)) {
      let top = stack.pop();
      if(top === undefined) return [];

      while(!/\(/.test(top)) {
        result.push(top);
        top = stack.pop();
        if(top === undefined) return [];
      }
    } else {
      if(/!/.test(token)) {
        stack.push(token);
      } else {
        if(/!/.test(stack[stack.length - 1]) && !/\(/.test(token)) {
          const top = stack.pop();
          if(top === undefined) return [];

          result.push(top);
        }
        stack.push(token);
      }
    }
  }

  while(stack.length > 0) {
    const item = stack.pop();
    if(item === undefined) return [];
    result.push(item);
  }

  return result;
};

export const evaluateRPN = (rpn: string[]): number => {
  const stack: number[] = [];

  while(rpn.length > 0) {
    const token: string | undefined = rpn.shift();
    if(!token) return -1;

    if(/\d/.test(token)) { // 1, 0
      stack.unshift(parseInt(token));
    } else if(/!/.test(token)) { // !
      const a = stack.shift();
      stack.unshift(a == 0 ? 1 : 0);
    } else if(/&&/.test(token)) { // and
      const a = stack.shift();
      const b = stack.shift();
      if(a === undefined || b === undefined) {
        return -1;
      }
      stack.unshift(a && b);
    } else { // or
      const a = stack.shift();
      const b = stack.shift();
      if(a === undefined || b === undefined) {
        return -1;
      }

      stack.unshift(a || b);
    }
  }

  return stack.pop() ?? -1;
};

export const getTruthTableInputCombinations = (inputs: number): string[][] => {
  const combinations: string[][] = [];

  for(let i = Math.pow(2, inputs); i > 0; i--) {
    combinations.unshift((i-1).toString(2).padStart(inputs, "0").split(""));
  }
  return combinations;
};
