export const formatCurrency = (amount: number): string => {
    if (isNaN(amount)) {
        throw new Error('Invalid amount. Please provide a valid number.');
    }

    const parts = amount.toFixed(2).toString().split('.');
    const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `₹${wholePart}.${parts[1]}`;
};

export const buildUrlWithParams = (baseUrl: string, params: { [key: string]: string | number }): string => {
    const url = new URL(baseUrl, window.location.origin);

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            url.searchParams.append(key, params[key].toString());
        }
    }

    return url.toString();
};