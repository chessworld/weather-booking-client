// ViewBookingsPage.test.js
import React from "react";
import { describe, expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import ViewBookingsPage from '../pages/ViewBookingsPage'

describe('View bookings tab in app', () => {
    test('should display coffee button', () => {
        render(<ViewBookingsPage />)
        const coffeeText = screen.getByText('Support us!');
        expect(coffeeText).toBeInTheDocument();
    })
})
