import * as VIAM from '@viamrobotics/sdk';
import {
	PUBLIC_MACHINE_HOST,
	PUBLIC_MACHINE_API_KEY,
	PUBLIC_MACHINE_API_KEY_ID
} from '$env/static/public';

interface Machine {
	dispenseSticker: (result: number) => Promise<void>;
}
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
		const motorClient = new VIAM.MotorClient(machine, `motor-${result}`);
		return motorClient.goFor(10, 1);
	};

	return {
		dispenseSticker
	};
};
