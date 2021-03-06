/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RenderComponentType, Renderer, RootRenderer } from '@angular/core';
import { AnimationKeyframe, AnimationPlayer, AnimationStyles, RenderDebugInfo } from '../../private_import_core';
import { ClientMessageBrokerFactory, FnArg } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { RenderStore } from '../shared/render_store';
import { RenderStoreObject, Serializer } from '../shared/serializer';
export declare class WebWorkerRootRenderer implements RootRenderer {
    private _serializer;
    renderStore: RenderStore;
    private _messageBroker;
    globalEvents: NamedEventEmitter;
    private _componentRenderers;
    constructor(messageBrokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: Serializer, renderStore: RenderStore);
    private _dispatchEvent(message);
    renderComponent(componentType: RenderComponentType): Renderer;
    runOnService(fnName: string, fnArgs: FnArg[]): void;
    allocateNode(): WebWorkerRenderNode;
    allocateId(): number;
    destroyNodes(nodes: any[]): void;
}
export declare class WebWorkerRenderer implements Renderer, RenderStoreObject {
    private _rootRenderer;
    private _componentType;
    constructor(_rootRenderer: WebWorkerRootRenderer, _componentType: RenderComponentType);
    private _runOnService(fnName, fnArgs);
    selectRootElement(selectorOrNode: string, debugInfo?: RenderDebugInfo): any;
    createElement(parentElement: any, name: string, debugInfo?: RenderDebugInfo): any;
    createViewRoot(hostElement: any): any;
    createTemplateAnchor(parentElement: any, debugInfo?: RenderDebugInfo): any;
    createText(parentElement: any, value: string, debugInfo?: RenderDebugInfo): any;
    projectNodes(parentElement: any, nodes: any[]): void;
    attachViewAfter(node: any, viewRootNodes: any[]): void;
    detachView(viewRootNodes: any[]): void;
    destroyView(hostElement: any, viewAllNodes: any[]): void;
    setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;
    setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): void;
    setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void;
    setElementClass(renderElement: any, className: string, isAdd: boolean): void;
    setElementStyle(renderElement: any, styleName: string, styleValue: string): void;
    invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void;
    setText(renderNode: any, text: string): void;
    listen(renderElement: WebWorkerRenderNode, name: string, callback: Function): Function;
    listenGlobal(target: string, name: string, callback: Function): Function;
    animate(renderElement: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string, previousPlayers?: AnimationPlayer[]): AnimationPlayer;
}
export declare class NamedEventEmitter {
    private _listeners;
    private _getListeners(eventName);
    listen(eventName: string, callback: Function): void;
    unlisten(eventName: string, callback: Function): void;
    dispatchEvent(eventName: string, event: any): void;
}
export declare class AnimationPlayerEmitter {
    private _listeners;
    private _getListeners(player, phaseName);
    listen(player: AnimationPlayer, phaseName: string, callback: Function): void;
    unlisten(player: AnimationPlayer): void;
    dispatchEvent(player: AnimationPlayer, phaseName: string): void;
}
export declare class WebWorkerRenderNode {
    events: NamedEventEmitter;
    animationPlayerEvents: AnimationPlayerEmitter;
}
