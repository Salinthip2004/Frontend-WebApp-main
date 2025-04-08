"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Settings, Users, FileText, Info, Thermometer, ChevronRight, IdCard, CircleUserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Drone, Lightbulb, Globe } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Poppins, Kalam } from "next/font/google";
import { Separator } from "@/components/ui/separator"


const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const poppin3 = Poppins({ subsets: ["latin"], weight: "400" });
export default function Configs() {
    const [isOpen, setIsOpen] = useState(false);
    const [droneConfig, setDroneConfig] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDroneConfig = async () => {
        const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
        try {
          const response = await axios.get(`/configs/${droneId}`); // กำหนดตัวแปร response ที่นี่
          console.log("Fetched Drone Config:", response.data); // ตรวจสอบข้อมูลที่ได้รับจาก API
          setDroneConfig(response.data);
        } catch (error) {
          console.error("Error fetching drone config:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDroneConfig();
    }, []);
    
  
    return (
        <div className="flex w-full h-80 justify-center p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full max-w-4xl"
                    >
                      <Card className="shadow-lg  dark:border-gray-700">
                        <CardHeader>
                          <CardTitle className={`text-center text-xl font-bold mb-1.5  ${poppins.className}`}>Config</CardTitle>
                          
                        </CardHeader>
                        
                        <CardContent>
                          {loading ? (
                            <Skeleton className="w-full h-40 rounded-xl" />
                          ) : droneConfig ? (
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                              <IdCard className="text-red-500" />
                                <span className={`text-center  text-red-500 text-lg font-bold ${poppin3.className}`}>Drone ID: </span> 
                                <span className={`text-center  text-red-900 text-lg font-bold ${poppin3.className}`}>{droneConfig.drone_id}</span> 
                              </div>
                              <div className="flex items-center gap-2">
                              <CircleUserRound className="text-pink-500" />
                              <span className={`text-center  text-pink-500 text-lg font-bold ${poppin3.className}`}>Name:</span> 
                              <span className={`text-center  text-pink-900 text-lg font-bold ${poppin3.className}`}> {droneConfig.drone_name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Lightbulb className="text-yellow-500" />
                                <span className={`text-center  text-yellow-500 text-lg font-bold ${poppin3.className}`}>Light:</span> 
                                <span className={`text-center  text-yellow-900 text-lg font-bold ${poppin3.className}`}> {droneConfig.light}</span>
                              </div>
                              <div className="flex items-center gap-2 my-1.5 mb-">
                                <Globe className="text-green-500" />
                                <span className={`text-center  text-Blue-500 text-lg font-bold ${poppin3.className}`}>Country:</span> 
                                <span className={`text-center  text-Blue-900 text-lg font-bold ${poppin3.className}`}>{droneConfig.country}</span> 
                              </div>
                            </div>
                          ) : (
                            <p className="text-center text-red-500">No configuration data available.</p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
           
            );
        }