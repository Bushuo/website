export default function extractYearFromDateString(date: string) {
    const year = date.split("-").shift();
    return year ?? "";
}
