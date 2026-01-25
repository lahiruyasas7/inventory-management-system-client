"use client";

import { useGetExpensesByCategoryQuery } from "@/state/api";
import React, { useMemo, useState, useCallback } from "react";
import Header from "../(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  PieChart as RechartsPieChart,
} from "recharts";
import {
  AggregatedData,
  AggregatedDataItem,
  ExpenseByCategorySummary,
} from "../types/types";

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }, []);

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        const category = data.category;

        if (!acc[category]) {
          acc[category] = {
            name: category,
            amount: 0,
            color: `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`,
          };
        }

        acc[category].amount += amount;
        return acc;
      }, {} as AggregatedData);

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate, parseDate]);

  // Custom Tooltip component to avoid the state update issue
  const CustomTooltip = useCallback(({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-gray-600">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  }, []);

  // Handle pie segment hover
  const handlePieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div className="mb-5">
      <Header name="Expenses" />
      <p className="mb-4">A Visual representation of expenses over time.</p>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Filter Section */}
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Professional">Professional</option>
                <option value="Salaries">Salaries</option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          {aggregatedData.length === 0 ? (
            <div className="flex items-center justify-center h-400">
              <p className="text-gray-500">
                No data available for the selected filters
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPieChart>
                <Pie
                  data={aggregatedData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="amount"
                  onMouseEnter={handlePieEnter}
                  // activeIndex={activeIndex ?? undefined}
                  // activeShape={{ stroke: "#fff", strokeWidth: 2 }}
                >
                  {aggregatedData.map(
                    (entry: AggregatedDataItem, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === activeIndex
                            ? "rgb(29, 78, 216)"
                            : entry.color
                        }
                      />
                    ),
                  )}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
