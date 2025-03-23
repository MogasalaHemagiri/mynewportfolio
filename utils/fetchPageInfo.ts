export const fetchPageInfo = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Response:", data); // Log full response

        if (!data || !data.pageInfo) {
            console.error("Invalid response from API: Missing pageInfo");
            return {} as PageInfo;
        }

        return data.pageInfo;
    } catch (error) {
        console.error("Error fetching PageInfo:", error);
        return {} as PageInfo; // Return empty object to prevent crashes
    }
};
