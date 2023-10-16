import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest'
import App from '../App';
import ViewBookingsPage from '../pages/ViewBookingsPage';


test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});


// test("ViewBookingsPage component is defined", () => {
//     const { container } = render(<ViewBookingsPage />);
//     expect(container).toBeDefined();
//   });

test('1st navbar button has correct route', () => {
  const { baseElement } = render(<App />);
  const firstTabButton = baseElement.querySelector('.nav-bar-button:nth-child(1)');
  const expectedHref = '/statisticPage';
  expect(firstTabButton.getAttribute('href')).toEqual(expectedHref);
});

test('2nd navbar button has correct route', () => {
  const { baseElement } = render(<App />);
  const secondTabButton = baseElement.querySelector('.nav-bar-button:nth-child(2)');
  const expectedHref = '/bookingPageDateLocation';
  expect(secondTabButton.getAttribute('href')).toEqual(expectedHref);
});

test('3rd navbar button has correct route', () => {
  const { baseElement } = render(<App />);
  const thirdTabButton = baseElement.querySelector('.nav-bar-button:nth-child(3)');
  const expectedHref = '/viewBookingsPage';
  expect(thirdTabButton.getAttribute('href')).toEqual(expectedHref);
});

// test('1st navbar button should be homepage'), () => {
//   const { baseElement } = render(<App />);
//   const iconElement = baseElement.querySelector('.nav-bar-icon');
//   expect(iconElement).toHaveAttribute('icon', 'yo');
// }




  