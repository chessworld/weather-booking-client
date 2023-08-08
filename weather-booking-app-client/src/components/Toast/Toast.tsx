import React from "react";
import { Component } from "react";
import { IonToast } from "@ionic/react";

import IToastProps from "./Interface/IToastProps";
import IToastState from "./Interface/IToastState";

class Toast extends Component<IToastProps, IToastState> {
    constructor(props: IToastProps) {
        super(props);

        this.state = {
            ...this.props
        };
    }

    componentDidUpdate(prevProps: Readonly<IToastProps>, prevState: Readonly<IToastState>, snapshot?: any): void {
        if (prevProps != this.props) {
            this.setState({
                ...this.props
            })
        }
    }


    render(): React.ReactNode {
        return (
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState({
                        showToast: false,
                        toastMessage: '',
                    })
                    }
                    message={this.state.toastMessage}
                    duration={1000}
                />

        );
    }
};

export default Toast;
