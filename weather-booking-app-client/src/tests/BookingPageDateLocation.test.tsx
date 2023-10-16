import BookingPageDateLocation from '../pages/BookingPage/BookingPageDateLocation';
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from 'vitest'

import React from "react";
import { render } from "@testing-library/react";

test("renders IonSegmentButton elements", () => {
  const { queryAllByTestId } = render(<BrowserRouter><BookingPageDateLocation /></BrowserRouter>);
  
  // Select the IonSegmentButton elements using their data-testid attributes
  const morningSegmentButton = queryAllByTestId("segment-button-morning"); 
  const afternoonSegmentButton = queryAllByTestId("segment-button-afternoon");
  const eveningSegmentButton = queryAllByTestId("segment-button-evening");
  const nightSegmentButton = queryAllByTestId("segment-button-night");

  // Assert that at least one IonSegmentButton is found
  expect(morningSegmentButton.length).toBeGreaterThan(0);
  expect(afternoonSegmentButton.length).toBeGreaterThan(0);
  expect(eveningSegmentButton.length).toBeGreaterThan(0);
  expect(nightSegmentButton.length).toBeGreaterThan(0);
});