export const toFullName = (name: string, surname: string, patronymic?: string): string => {
    const patronymicStr = patronymic ?? ""
    return `${surname} ${name} ` + patronymicStr;
}

export const toShortName = (name: string, surname: string, patronymic?: string): string => {
    return `${abbreviate(surname, 99)} ${abbreviate(name, 1)} ${abbreviate(patronymic, 1)}`.trim();
};

export const abbreviate = (name?: string, limit: number = 99): string => {
    if (!name) return "";
    return name.length <= limit ? name : `${name.slice(0, limit)}.`;
};