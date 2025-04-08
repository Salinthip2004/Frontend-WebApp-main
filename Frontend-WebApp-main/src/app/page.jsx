"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Info, Thermometer, FileText, ChevronRight } from "lucide-react";
import axios from "axios";
import { Poppins, Kalam } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import Configs from "@/components/salinthip/config";
import TempLog from "@/components/salinthip/templog";
import Logs from "@/components/salinthip/logs";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const poppin4 = Poppins({ subsets: ["latin"], weight: "400" });
const poppin3 = Poppins({ subsets: ["latin"], weight: "300" });
const poppin1 = Poppins({ subsets: ["latin"], weight: "100" });
const kalam = Kalam({ subsets: ["latin"], weight: "400" });

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [droneConfig, setDroneConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDroneConfig = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      try {
        const response = await axios.get(`/configs/${droneId}`);
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`md:h-screen inset-y-0 left-0 z-50 h-full w-64 bg-white border-r text-black p-5 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 sticky top-0 overflow-y-auto`}
      >
        <button className="absolute top-3 right-1 md:hidden" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6" />
        </button>

        <p className="mb-6 text-transparent inline-block mr-9 px-3 py-2 rounded-full">
          <span className={`text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#cd9ffa] via-[#cd9ffa] to-[#cd9ffa] ${poppins.className}`}>
            64050702_salinthip
          </span>
        </p>

        <nav className="flex flex-col space-y-4">
          <Link href="/viewconfig" className={`flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-200 ${poppin3.className}`}>
            <Info className="h-5 w-5" />
            <span>Config</span>
          </Link>
          <Link href="/temp" className={`flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-200 ${poppin3.className}`}>
            <Thermometer className="h-5 w-5" />
            <span>Temp Logs</span>
          </Link>
          <Link href="/viewlogs" className={`flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-200 ${poppin3.className}`}>
            <FileText className="h-5 w-5" />
            <span>View Logs</span>
          </Link>
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-col flex-1 min-h-screen bg-gray-100 p-4">
        {/* Top Bar */}
        <div className="w-full flex items-center space-x-2 md:text-nowrap bg-white shadow-md p-4 rounded-t-xl font-semibold text-gray-900 text-sm md:text-lg">
          <Link href="/#" className={`inline-block bg-stone-100 px-3.5 rounded-full transition-all duration-200 ${poppin1.className} ${poppin4.className}`}>
            <span>Main</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-500" />
          <Link href="/viewconfig" className={`hover:text-gray-500 transition-all duration-200 ${poppin4.className}`}>Config</Link>
          <ChevronRight className="w-3 h-3 text-gray-500" />
          <Link href="/temp" className={`hover:text-gray-500 transition-all duration-200 ${poppin4.className}`}>Temp Logs</Link>
          <ChevronRight className="w-3 h-3 text-gray-500" />
          <Link href="/viewlogs" className={`hover:text-gray-500 transition-all duration-200 ${poppin4.className}`}>View Logs</Link>
        </div>

        <Separator />

        {/* Content Section */}
        <div className="container min-h-screen max-w-screen-lg mx-auto bg-white p-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Left Section: Config */}
            <div className="w-full bg-white rounded-lg shadow-lg p-4">
              <Configs />
            </div>

            {/* Middle Section: Temp Logs */}
            <div className="w-full bg-white rounded-lg shadow-lg p-4">
              <TempLog />
            </div>

            {/* Right Section: Logs */}
            <div className="w-full bg-white rounded-lg shadow-lg p-4">
              <Logs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
