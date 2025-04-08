'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Poppins } from "next/font/google";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const poppin3 = Poppins({ subsets: ["latin"], weight: "300" });

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;

    useEffect(() => {
        const fetchLogs = async () => {
            const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
            try {
                const response = await axios.get(`/logs/${droneId}`);
                const sortedLogs = response.data
                    .sort((a, b) => new Date(b.created) - new Date(a.created)) // เรียงจากใหม่ไปเก่า
                    .slice(0, 25); // จำกัด 25 รายการ
                setLogs(sortedLogs);
            } catch (error) {
                console.error("Error fetching logs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    // Pagination
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
    const pageCount = Math.ceil(logs.length / logsPerPage);

    return (

        <Card className="p-2 shadow-xl w-full">
            <CardHeader>
                <CardTitle className={`text-center mb-1 text-xl font-bold ${poppins.className}`}>
                    View Logs
                </CardTitle>
                <Separator />
                <p className="text-xs  text-gray-600 ">
                            Showing {currentLogs.length} of {Math.min(25, logs.length)} logs (max 25)
                        </p>
            </CardHeader>

            {loading ? (
                <div className="space-y-4">
                    {/* Skeleton Table */}
                    <div className="overflow-x-auto">
                        <Table className="w-full border rounded-xl">
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: logsPerPage }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <Table className="w-full border rounded-lg">
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>Created</TableHead>
                                    <TableHead>Country</TableHead>
                                    <TableHead>Drone ID</TableHead>
                                    <TableHead>Drone Name</TableHead>
                                    <TableHead>Celsius</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentLogs.map((log, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{new Date(log.created).toLocaleString()}</TableCell>
                                        <TableCell>{log.country}</TableCell>
                                        <TableCell>{log.drone_id}</TableCell>
                                        <TableCell>{log.drone_name}</TableCell>
                                        <TableCell className="font-semibold">{log.celsius}°C</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>



                    {/* Pagination */}
                    {/* Pagination + Showing logs count */}
                   
                       

                        <Pagination className="min-w-[200px]">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>

                                {Array.from({ length: pageCount }, (_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            isActive={currentPage === index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                                        disabled={currentPage === pageCount}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                  
                </>
            )}
        </Card>
    );
}