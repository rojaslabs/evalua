const logout = async (data) => {
    try {
        const res = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
        });
        const json = await res.json();
        if (!res.ok) {
            return { success: false, data: json };
        }
        return { success: true, data: json };
    } catch (e) {
        console.error(e);
        return { success: false, data: { errors: { error: e } } };
    }
};

export default logout;