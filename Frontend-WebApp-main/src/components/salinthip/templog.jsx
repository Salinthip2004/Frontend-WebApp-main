"use client";
import React, { useState, useEffect } from "react";
import { Thermometer } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const poppin3 = Poppins({ subsets: ["latin"], weight: "300" });

export default function TempLog() {
    const [droneConfig, setDroneConfig] = useState(null);

    const form = useForm({
        defaultValues: {
            temperature: "",
        },
    });

    useEffect(() => {
        const fetchDroneConfig = async () => {
            const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
            try {
                const response = await axios.get(`/configs/${droneId}`);
                setDroneConfig(response.data);
            } catch (error) {
                console.error("Error fetching drone config:", error);
            }
        };
        fetchDroneConfig();
    }, []);

    const onSubmit = async (data) => {
        const droneId = parseInt(process.env.NEXT_PUBLIC_DRONE_ID);
        const droneName = process.env.NEXT_PUBLIC_DRONE_NAME;
        const country = process.env.NEXT_PUBLIC_COUNTRY;

        try {
            await axios.post(`/logs`, {
                drone_id: droneId,
                drone_name: droneName,
                celsius: data.temperature,
                country: country,
            });

            Swal.fire({
                title: "Success!",
                text: "Temperature logged successfully!",
                icon: "success",
                confirmButtonColor: "#4CAF",
            });

            form.reset();
        } catch (error) {
            console.error("Error submitting log:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to log temperature.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="flex w-full justify-center p-6 bg-gradient-to-r">
            {/* Expanded form container */}
            <div className="w-full max-w-4xl shadow-lg px-8 py-5 border rounded-lg border-gray-300 dark:border-gray-700 bg-white">
                <h2 className={`text-center mb-5 text-2xl font-bold ${poppins.className} text-gray-800`}>
                    Temperature Log Form
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="temperature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center space-x-2">
                                        <Thermometer className="text-blue-500" />
                                        <span className={`text-xl font-semibold ${poppin3.className} text-blue-500`}>
                                            Temperature (°C)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter temperature"
                                            className="border-2 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Removed Separator */}
                        <Button type="submit" className="w-full py-3 text-white font-bold bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

