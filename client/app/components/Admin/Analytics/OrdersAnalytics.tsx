
import { useGetCoursesAnalyticsQuery, useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC, useEffect, useState } from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    LineChart,
    Tooltip,
    Legend,
} from "recharts";
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/styles';
type Props = {
    isDashboard?:boolean;
}

const OrdersAnalytics: FC<Props> = ({isDashboard}: Props) => {
    const { data, isLoading, isError } = useGetOrdersAnalyticsQuery({});


    const analyticsData: any = [];
    data &&
        data.orders.last12Months.forEach((item: any) => {
            analyticsData.push({ name: item.name, Count: item.count });
        });
    const minValue = 0;
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={isDashboard ? "h-[30vh]" : "h-fit ml-6 mb"}>
                        <div
                            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[120px] mb-[50px]"}
                        >
                            <h1
                                className={`${styles.title} ${isDashboard && "!text-[20px]"
                                    } px-5 !text-start`}
                            >
                                Orders Analytics
                            </h1>
                            {!isDashboard && (
                                <p className={`${styles.label} px-5`}>
                                    Last 12 months analytics data{" "}
                                </p>
                            )}
                        </div>
                        <div
                            className={`w-full ${isDashboard ? "h-[90%]" : "h-fit"
                                } flex items-center justify-center`}
                        >

                            <ResponsiveContainer
                                width={isDashboard ? "100%" : "90%"}
                                height={isDashboard ? "100%" : "50%"}
                            >

                                <LineChart
                                    width={500}
                                    height={300}
                                    data={analyticsData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    {!isDashboard && <Legend />}
                                    <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>
                )
            }
        </>
    )
}
export default OrdersAnalytics