import * as VIAM from '@viamrobotics/sdk';

export interface Machine {
	dispenseSticker: (result: number) => Promise<void>;
	helpDispenseSticker: (result: number) => Promise<void>;
}

interface MotorBoardConfig {
	pin: number;
	dispenseTime: number;
	dutyCycle: number;
}

const MOTOR_TO_CONFIG: MotorBoardConfig[] = [
	{
		pin: 0,
		dispenseTime: 1_750,
		dutyCycle: 0.075
	},
	{
		pin: 1,
		dispenseTime: 1_900,
		dutyCycle: 0.075
	},
	{
		pin: 2,
		dispenseTime: 1_700,
		dutyCycle: 0.09
	},
	{
		pin: 4,
		dispenseTime: 1_900,
		dutyCycle: 0.075
	},
	{
		pin: 5,
		dispenseTime: 1_700,
		dutyCycle: 0.09
	},
	{
		pin: 6,
		dispenseTime: 2_100,
		dutyCycle: 0.075
	},
	{
		pin: 8,
		dispenseTime: 1_300,
		dutyCycle: 0.09
	},
	{
		pin: 9,
		dispenseTime: 1_600,
		dutyCycle: 0.09
	},
	{
		pin: 10,
		dispenseTime: 2_500,
		dutyCycle: 0.075
	}
];
const MOTOR_FREQ = 50;

const getCookie = (name: string): string => {
	console.log("Getting cookie", document.cookie);
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");

	if (parts.length === 2) {
		return parts.pop()?.split(";").shift() || "";
	}
	return "";
}
export const createMachine = async (): Promise<Machine> => {
	// TODO: Fetch config attributes
	let host: string = getCookie("host");
	let publicAPIKey = getCookie("api-key");
	let publicKeyId = getCookie("api-key-id");
	
	const machine = await VIAM.createRobotClient({
		host: host,
		credentials: {
			type: 'api-key',
			payload: publicAPIKey,
			authEntity: publicKeyId
		},
		signalingAddress: 'https://app.viam.com:443'
	});

	const dispenseSticker = async (result: number) => {
		console.log('dispensing sticker...');

		const { pin, dispenseTime, dutyCycle } = MOTOR_TO_CONFIG[result];
		const motorBoardClient = new VIAM.BoardClient(machine, 'motor-board');
		await motorBoardClient.setPWMFrequency(`${pin}`, MOTOR_FREQ);
		await motorBoardClient.setPWM(`${pin}`, dutyCycle);
		await setTimeout(async () => {
			await motorBoardClient.setGPIO(`${pin}`, false);
		}, dispenseTime);
	};

	const helpDispenseSticker = async (result: number) => {
		const { pin, dispenseTime, dutyCycle } = MOTOR_TO_CONFIG[result];
		const motorBoardClient = new VIAM.BoardClient(machine, 'motor-board');
		await motorBoardClient.setPWMFrequency(`${pin}`, MOTOR_FREQ);
		await motorBoardClient.setPWM(`${pin}`, dutyCycle);
		await setTimeout(async () => {
			await motorBoardClient.setGPIO(`${pin}`, false);
		}, dispenseTime / 4);
	};

	return {
		dispenseSticker,
		helpDispenseSticker
	};
};
