import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LandingPage from "../pages/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from 'vitest'

// test("renders the <Kofi> component", () => {
//   const { getByTestId } = render(<BrowserRouter><LandingPage /></BrowserRouter>);
  
//   // Use getByTestId to find the <Kofi> component by data-testid
//   const kofiComponent = getByTestId("kofi-component");
  
//   // Assert that the <Kofi> component is present
//   expect(kofiComponent).toBeInTheDocument();
// });


test("clicking 'Make a Booking!' button navigates to the correct route", () => {
  const { getByText } = render(<BrowserRouter><LandingPage /></BrowserRouter>);
  
  const makeBookingButton = getByText("Make a Booking!");
  
  fireEvent.click(makeBookingButton);
  
  expect(window.location.pathname).toBe("/bookingPageDateLocation");
});

test("clicking 'Check out our Stats' button navigates to the correct route", () => {
  const { getByText } = render(<BrowserRouter><LandingPage /></BrowserRouter>);
  
  const statsButton = getByText("Check out our Stats");
  
  fireEvent.click(statsButton);

  expect(window.location.pathname).toBe("/statisticPage");
});


