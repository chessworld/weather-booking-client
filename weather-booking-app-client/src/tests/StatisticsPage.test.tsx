import React from "react";
import { describe, expect, test } from 'vitest'

import { render, fireEvent} from "@testing-library/react";
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage";
import { BrowserRouter } from "react-router-dom";


test('displays a loading spinner when there is no chart data', () => {
    const { getByTestId } = render(<StatisticsPage />);

    const loadingSpinner = getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
  