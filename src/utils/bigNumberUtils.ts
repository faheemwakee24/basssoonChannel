export function toBN(value: number | string) {
    const num = typeof value === 'number' ? value : Number(value);
    return {
        toNumber() {
            return num;
        },
    };
}

export type BigNumberLike = ReturnType<typeof toBN>;


