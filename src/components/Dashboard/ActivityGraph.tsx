"use client";

import React from "react";
import { FiActivity } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

const data = [
  {
    name: "Jan",
    Completed: 12,
    Rejected: 2,
  },
  {
    name: "Feb",
    Completed: 27,
    Rejected: 4,
  },
  {
    name: "Mar",
    Completed: 9,
    Rejected: 9,
  },
  {
    name: "Apr",
    Completed: 24,
    Rejected: 2,
  },
  {
    name: "May",
    Completed: 17,
    Rejected: 19,
  },
  {
    name: "Jun",
    Completed: 33,
    Rejected: 8,
  },
  {
    name: "Jul",
    Completed: 26,
    Rejected: 8,
  },
];

export const ActivityGraph = () => {
  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4 flex justify-center">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiActivity /> Tasks Ratio
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="Completed"
              stroke="#18181b"
              fill="#18181b"
            />
            <Line
              type="monotone"
              dataKey="Rejected"
              stroke="#E53935"
              fill="#E53935"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
