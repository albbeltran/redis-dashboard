import toast from "react-hot-toast";

export function handleFront(error: unknown) {
    let errMssg: string;
    if (error instanceof Error) errMssg = error.message;
    else {
        console.log(error);
        errMssg = 'Error desconocido';
    }

    toast(errMssg, {
        style: {
            background: '#d93b2e',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        icon: '🙈',
    });
    return null;
}

export function handleBack(error: unknown) {
    let errMssg;
    if (error instanceof Error) errMssg = error.message;
    else {
        console.log(error);
        errMssg = "Unknown Error!";
    }
    return errMssg;
}