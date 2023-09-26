export default interface GraphDataField {
    labels: string[],
    datasets:
    {
        label: string,
        data: number[],
        backgroundColor: string,
        stack: string
    }[]
}
