import { useRecoilValue } from 'recoil';
import {
	channelsState as channelsAtom,
} from '../atoms';

const channels = useRecoilValue(channelsAtom);

export function getChannelById(id) {
    channels.find((c) => {
        return c._id === props.id;
    });
}