import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum, range } from './utils/number-functions';
import LifeMatrix from './service/life-matrix';

const matrix1 = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]];
const matrix2_init = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]];
const matrix2_next = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]];

test("next state test", () => {
  const lifeMatrix1 = new LifeMatrix(matrix1);
  expect(matrix1).toEqual(lifeMatrix1.next());
  const lifeMatrix2 = new LifeMatrix(matrix2_init);
  expect(matrix2_next).toEqual(lifeMatrix2.next());
  expect(matrix2_init).toEqual(lifeMatrix2.next());
})