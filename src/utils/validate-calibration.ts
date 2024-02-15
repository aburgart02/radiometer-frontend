export const validateCalibration = (jsonData: any): boolean => {
    try {
        if (!jsonData.yLabel) {
            return false;
        }
        if (!jsonData.calibrationData) {
            return false;
        }
        if (!Array.isArray(jsonData.calibrationData)) {
            return false;
        }
        for (const data of jsonData.calibrationData) {
            if (typeof data.x !== 'number' || typeof data.y !== 'number') {
                return false;
            }
        }

        return true;
    } catch (error) {
        return false;
    }
}