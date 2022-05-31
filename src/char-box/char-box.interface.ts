export interface Module{
    key: string,
    level: number,
}

export interface Skill{
    key: string,
    level: number,
}

export interface Character{
    key: string,
    potentialLevel: number,
    elite: number,
    level: number,
    trust: number,
    skills: Record<string, Skill>,
    modules: Record<string, Module>,
    moduleUse: string,
    skillUse: string,
    favorite:  boolean,
}

export interface CharBox extends Document{
    id: string,
    userId: string,
    characterKeys: Record<string, Character>,
    updatedDate: string,
}