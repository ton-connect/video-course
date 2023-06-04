import {Locales, THEME, useTonConnectUI} from "@tonconnect/ui-react";
import {ChangeEvent} from "react";

const mapThemeLabelToTHEME = {
    system: 'SYSTEM',
    dark: THEME.DARK,
    light: THEME.LIGHT
} as const;

export const Settings = () => {
    const [_, setOptions] = useTonConnectUI();

    const onLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOptions({ language: e.target.value as Locales })
    }

    const onThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOptions({ uiPreferences: {theme: mapThemeLabelToTHEME[e.target.value as keyof typeof mapThemeLabelToTHEME]}})
    }


    return <div style={{ marginBottom: '20px' }}>
        <div>
            lang:&nbsp;
            <select onChange={onLangChange}>
                <option>en</option>
                <option>ru</option>
            </select>
        </div>
        <div>
            theme:&nbsp;
            <select onChange={onThemeChange}>
                <option>system</option>
                <option>dark</option>
                <option>light</option>
            </select>
        </div>
    </div>
}
