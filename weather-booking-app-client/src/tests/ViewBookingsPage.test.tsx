// ViewBookingsPage.test.js
import React from "react";
import { describe, expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import ViewBookingsPage from '../pages/ViewBookingsPage';
import { BrowserRouter } from "react-router-dom";


test("renders 'Book weather Now!' button", () => {
  const { getByRole } = render(<BrowserRouter><ViewBookingsPage /></BrowserRouter>);
  
  const BookNowButton = getByRole("button", { name: "Book Weather Now!" });


  expect(BookNowButton).toBeInTheDocument();
});

