import * as VIAM from '@viamrobotics/sdk';
import {
	PUBLIC_MACHINE_HOST,
	PUBLIC_MACHINE_API_KEY,
	PUBLIC_MACHINE_API_KEY_ID
} from '$env/static/public';

export interface Machine {
	dispenseSticker: (result: number) => Promise<void>;
}

const MOTOR_TO_PIN = ['0', '1', '2', '4', '5', '6', '8', '9', '10'];
const MOTOR_TO_DISPENSE_TIME_MS = [1_400, 1_700, 1_700, 1_600, 1_400, 1_600, 1_300, 1_600, 1_725];
const MOTOR_FREQ = 50;
const ON_DUTY_CYCLE = 0.09;

export const createMachine = async (): Promise<Machine> => {
	const machine = await VIAM.createRobotClient({
		host: PUBLIC_MACHINE_HOST,
		credential: {
			type: 'api-key',
			payload: PUBLIC_MACHINE_API_KEY
		},
		authEntity: PUBLIC_MACHINE_API_KEY_ID,
		signalingAddress: 'https://app.viam.com:443'
	});

	const dispenseSticker = async (result: number) => {
		console.log('dispensing sticker...');

		const pin = MOTOR_TO_PIN[result];
		const motorBoardClient = new VIAM.BoardClient(machine, 'motor-board');
		await motorBoardClient.setPWMFrequency(pin, MOTOR_FREQ);
		await motorBoardClient.setPWM(pin, ON_DUTY_CYCLE);
		await setTimeout(async () => {
			await motorBoardClient.setGPIO(pin, false);
		}, MOTOR_TO_DISPENSE_TIME_MS[result]);
	};

	return {
		dispenseSticker
	};
};
