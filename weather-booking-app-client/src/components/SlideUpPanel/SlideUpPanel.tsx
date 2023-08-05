import { Component, createRef, RefObject } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import {
    IonIcon
} from '@ionic/react';
import { removeOutline } from "ionicons/icons";
import SlideUpPanelState from './Interface/SlideUpPanelState';
import SlideUpPanelProps from './Interface/SlideUpPanelProps';
import './SlideUpPanel.css';


class SlideUpPanel extends Component<SlideUpPanelProps, SlideUpPanelState> {
    panelRef: RefObject<any>;

    constructor(props: SlideUpPanelProps) {
        super(props);

        this.state = {
            showSlideUpPanel: this.props.showPanel,
            deltaPosition: {
                x: 0,
                y: 0
            }
        }

        this.panelRef = createRef();
    }

    componentDidUpdate(prevProps: Readonly<SlideUpPanelProps>, prevState: Readonly<SlideUpPanelState>, snapshot?: any): void {
        if (this.props !== prevProps) {
            this.setState({
                showSlideUpPanel: this.props.showPanel
            })
        }
    }

    handleStop: DraggableEventHandler = (_, data) => {
        const panelHeight = this.panelRef.current?.offsetHeight;

        if (panelHeight && data.y < panelHeight / 2) {
            this.setState({
                ...this.state,
                showSlideUpPanel: this.props.showPanel && true
            });
        } else {
            this.setState({
                ...this.state,
                showSlideUpPanel: false
            });
        }
    };

    render(): React.ReactNode {
        const { showSlideUpPanel, deltaPosition } = this.state;

        return (
            <Draggable
                axis="y"
                bounds={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: window.innerHeight
                }}
                handle=".drag-handle"
                position={deltaPosition}
                onStop={this.handleStop} >
                <div
                    className={`slide-up-panel ${!showSlideUpPanel && 'hide-slide-up-panel'}`}
                    ref={this.panelRef}
                >
                    <div className="drag-handle">
                        <IonIcon className="drag-handle slide-up-panel-icon" icon={removeOutline} />
                    </div>
                    {
                        this.props.children
                    }
                </div>
            </Draggable>
        )
    }
}

export default SlideUpPanel;
