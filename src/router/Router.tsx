import { Layout } from "@/ui/pages/Layout";
import { MatchCreate } from "@/ui/pages/MatchCreate";
import { MatchList } from "@/ui/pages/MatchList";
import { MatchUpdate } from "@/ui/pages/MatchUpdate";
import { UploadMatches } from "@/ui/pages/UploadMatches";
import { Route, Routes } from "react-router";

export const Router = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<MatchList />} />
            <Route path="/matches/create" element={<MatchCreate />} />
            <Route path="/matches/update" element={<MatchUpdate />} />
            <Route path="/matches/upload" element={<UploadMatches />} />
        </Route>
    </Routes>
);