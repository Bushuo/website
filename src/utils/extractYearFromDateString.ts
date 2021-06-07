export default function extractYearFromDateString(date: string) {
    return date.split("-").shift();
}
